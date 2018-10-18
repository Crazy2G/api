const { Route, JimpUtils } = require('../index')
const { Router } = require('express')

module.exports = class Image extends Route {
  constructor (client) {
    super(client)
    this.name = 'image'
  }

  register (app) {
    const router = Router()

    router.get('/', (req, res) => {
      res.status(200).json({
        endpoints: [
          'POST /blur',
          'POST /fisheye',
          'POST /jpeg',
          'POST /pixelate'
        ]
      })
    })

    router.get('/ping', (req, res) => {
      res.status(200).json({ message: 'OK' })
    })

    router.post('/blur', async (req, res) => {
      if (!req.body.image) return res.status(400).json({ message: 'You need to specify a image to blur from' })
      else {
        if (req.body.intensity && (req.body.intensity > 100 || req.body.intensity < 0)) return res.status(400).json({ message: 'Intensity must be a number between 0 and 100' })
        const imageURL = req.body.image
        const intensity = req.body.intensity || 5

        const image = await JimpUtils.read(imageURL).then(img => img.blur(intensity))
        res.status(200).set('Content-Type', 'image/png').send(await image.getBufferAsync(JimpUtils.MIME_PNG))
      }
    })

    router.post('/fisheye', async (req, res) => {
      if (!req.body.image) return res.status(400).json({ message: 'You need to specify a image to fisheye from' })
      else {
        if (req.body.intensity && (req.body.intensity > 100 || req.body.intensity < 0)) return res.status(400).json({ message: 'Intensity must be a number between 0 and 100' })
        const imageURL = req.body.image
        const intensity = req.body.intensity || 1.6

        const image = await JimpUtils.read(imageURL).then(img => img.fisheye({ r: intensity }))
        res.status(200).set('Content-Type', 'image/png').send(await image.getBufferAsync(JimpUtils.MIME_PNG))
      }
    })

    router.post('/jpeg', async (req, res) => {
      if (!req.body.image) return res.status(400).json({ message: 'You need to specify a image to jpegify from' })
      else {
        if (req.body.quality > 100 || req.body.quality < 0) return res.status(400).json({ message: 'Quality must be a number between 0 and 100' })
        const imageURL = req.body.image
        const quality = req.body.quality || 1

        const image = await JimpUtils.read(imageURL).then(img => img.quality(quality))
        res.status(200).set('Content-Type', 'image/jpeg').send(await image.getBufferAsync(JimpUtils.MIME_JPEG))
      }
    })

    router.post('/pixelate', async (req, res) => {
      if (!req.body.image) return res.status(400).json({ message: 'You need to specify a image to pixelate from' })
      else {
        if (req.body.intensity && (req.body.intensity > 100 || req.body.intensity < 0)) return res.status(400).json({ message: 'Intensity must be a number between 0 and 100' })
        const imageURL = req.body.image
        const intensity = req.body.intensity || 5

        const image = await JimpUtils.read(imageURL).then(img => img.pixelate(intensity))
        res.status(200).set('Content-Type', 'image/png').send(await image.getBufferAsync(JimpUtils.MIME_PNG))
      }
    })

    app.use(this.path, router)
  }
}
