const fs = require('fs/promises')
const path = require('path')
const mime = require('mime-types')
async function getUpdateContent(req, res, next) {
  try {
    const uploadsContent = await fs.readdir('./uploads', {
      withFileTypes: true,
    })
    const uploadsContentInformation = []
    for (const content of uploadsContent) {
      uploadsContentInformation.push({
        name: content.name,
        type: content.isFile() ? 'file' : 'dir',
        url: content.isFile() ? `/${content.name}` : `/${content.name}/`,
      })
    }
    res.json({ path: '//', items: uploadsContentInformation })
  } catch (err) {
    next(err)
  }
}
async function getContent(req, res, next) {
  try {
    const localPath =
      req.params.name.at(-1) === '/'
        ? req.params.name.slice(0, -1)
        : req.params.name
    const ext = path.extname(localPath).toLowerCase()
    const contentPath = path.resolve('uploads', localPath)
    const contentStat = await fs.stat(contentPath)
    if (req.params.operation === 'browse' && contentStat.isDirectory()) {
      const uploadsContent = await fs.readdir(contentPath, {
        withFileTypes: true,
      })
      const uploadsContentInformation = [
        {
          name: '../',
          type: 'up',
          url: `/${path.dirname(localPath)}/`,
        },
      ]
      for (const content of uploadsContent) {
        uploadsContentInformation.push({
          name: content.name,
          type: content.isFile() ? 'file' : 'dir',
          url: content.isFile() ? `/${content.name}` : `/${content.name}/`,
        })
      }
      return res.json({
        path: `/${localPath}/`,
        items: uploadsContentInformation,
      })
    } else {
      if (req.params.operation === 'file' && contentStat.isFile()) {
        res.setHeader('Content-Type', mime.lookup(ext))
        res.sendFile(contentPath)
      } else {
        const error = new Error()
        error.path = contentPath
        throw error
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { getUpdateContent, getContent }
