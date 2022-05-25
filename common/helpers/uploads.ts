export class Helper {
  static customFileName(req, file, cb) {
    const originalName = file.originalname.split(".")[0]

    const modifiedFilename =
      originalName.replace(/\s+/g, "-").toLowerCase() +
      "-" +
      new Date().toISOString()

    let fileExtension = ""
    if (file.mimetype.indexOf("jpeg") > -1) {
      fileExtension = "jpg"
    } else if (file.mimetype.indexOf("png") > -1) {
      fileExtension = "png"
    } else if (file.mimetype.indexOf("pdf") > -1) {
      fileExtension = "pdf"
    }
    cb(null, modifiedFilename + "." + fileExtension)
  }

  static destinationPath(req, file, cb) {
    cb(null, "./uploads/")
  }

  static fileFilter(req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(new Error("File format should be PNG,JPG,JPEG"), false) // if validation failed then generate error
    }
  }
}
