// const path = require('path');
// const multer = require('multer');
// const sharp = require('sharp');
// const { v4: uuidv4 } = require('uuid');
// const sizeOf = require('image-size');

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/image'); //Đường dẫn hình khi tạo sản phẩm 
//     },
//     filename: (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         cb(null, uuidv4() + ext);
//     }
// });

// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, callback) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/gif" || file.mimetype == "image/jpeg") {
//             if (file.size > (5 * 1024 * 1024)) {
//                 let errorMessage = "Kích thước hình ảnh vượt quá giới hạn cho phép (5MB).";
//                 req.errorMessage = errorMessage;
//                 callback(null, false);
//             } else {
//                 callback(null, true);
//             }
//         } else {
//             let errorMessage = "Chỉ hỗ trợ các định dạng hình ảnh jpg, png và gif.";
//             req.errorMessage = errorMessage;
//             callback(null, false);
//         }
//     },
//     limits: {
//         fileSize: 5 * 1024 * 1024 // Dung lượng tối đa 5MB
//     }
// });

// const imageProcessingMiddleware = (req, res, next) => {
//     if (req.file) {
//         const filePath = req.file.path;

//         // Kiểm tra width của ảnh
//         sharp(filePath)
//             .metadata()
//             .then(metadata => {
//                 if (metadata.width > 50) {
//                     // Resize ảnh với width=200px, chất lượng 80%
//                     sharp(filePath)
//                         .resize(200, null, {
//                             withoutEnlargement: true
//                         })
//                         .jpeg({
//                             quality: 80,
//                             chromaSubsampling: '4:4:4'
//                         })
//                         .toFile(filePath + '_200.jpg', (err) => {
//                             if (err) {
//                                 console.error('Error while resizing image to width 200px:', err);
//                             }
//                         });

//                     // Resize ảnh với width=500px, chất lượng 80%
//                     sharp(filePath)
//                         .resize(500, null, {
//                             withoutEnlargement: true
//                         })
//                         .jpeg({
//                             quality: 80,
//                             chromaSubsampling: '4:4:4'
//                         })
//                         .toFile(filePath + '_500.jpg', (err) => {
//                             if (err) {
//                                 console.error('Error while resizing image to width 500px:', err);
//                             }
//                         });
//                 } else {
//                     console.log('Image width is less than 50px. No resizing is performed.');
//                     let errorMessage = "Kích thước hình ảnh phải rộng hơn 50px";
//                     req.errorMessage = errorMessage;
//                 }
//             })
//             .catch(err => {
//                 console.error('Error while reading image metadata:', err);
//             });

//         // Add watermark to image
//         // const watermarkPath = './path/to/watermark.png'; // Replace with actual path to watermark image
//         // sharp(filePath)
//         //     .composite([{ input: watermarkPath }])
//         //     .toFile(filePath + '_watermarked.jpg', (err) => {
//         //         if (err) {
//         //             console.error('Error while adding watermark to image:', err);
//         //         }
//         //     });
//     }

//     if (req.errorMessage) {
//         res.send(req.errorMessage);
//     } else {
//         next();
//     }
// };

// // const uploadWithProcessing = (req, res, next) => {
// //     upload.single('product_image')(req, res, (err) => {
// //         if (err instanceof multer.MulterError) {
// //             // console.log('Error during file upload:', err);
// //             res.render("lab7.hbs", { tieudesp: "Thêm thất bại" });
// //         } else if (err) {
// //             // console.log('Unknown error during file upload:', err);
// //             res.render("lab7.hbs", { tieudesp: "Thêm thất bại" });
// //         } else {
// //             imageProcessingMiddleware(req, res, next);
// //         }
// //     });
// // };
// const maxSize = 5 * 1024 * 1024;

// const uploadWithProcessing = (req, res, next) => {
//     // Tạo middleware tải lên
//     const upload = multer({
//         storage: storage,
//         limits: { fileSize: maxSize },
//         fileFilter: function (req, file, cb) {
//             const allowedExtensions = ['.jpg', '.jpeg', '.png'];
//             const fileExt = path.extname(file.originalname);

//             if (allowedExtensions.includes(fileExt)) {
//                 cb(null, true);
//             } else {
//                 cb(new Error('Chỉ chấp nhận các tệp tin .jpg, .jpeg và .png'));
//             }


//             // // Kiểm tra độ rộng của hình ảnh
//             // const image = sharp(file.path);
//             // image.metadata()
//             //     .then(metadata => {
//             //         const { width } = metadata;
//             //         if (width < 50) {
//             //             return cb(new Error('Độ rộng của hình ảnh phải lớn hơn 50px'));
//             //         }
//             //         cb(null, true);
//             //     })
//             //     .catch(err => cb(new Error('Lỗi trong quá trình xử lý hình ảnh')));

//             // if (req.file) {
//             //     const filePath = req.file.path;

//             //     // Kiểm tra width của ảnh
//             //     sharp(filePath)
//             //         .metadata()
//             //         .then(metadata => {
//             //             if (metadata.width > 50) {
//             //                 // Resize ảnh với width=200px, chất lượng 80%
//             //                 sharp(filePath)
//             //                     .resize(200, null, {
//             //                         withoutEnlargement: true
//             //                     })
//             //                     .jpeg({
//             //                         quality: 80,
//             //                         chromaSubsampling: '4:4:4'
//             //                     })
//             //                     .toFile(filePath + '_200.jpg', (err) => {
//             //                         if (err) {
//             //                             console.error('Error while resizing image to width 200px:', err);
//             //                         }
//             //                     });

//             //                 // Resize ảnh với width=500px, chất lượng 80%
//             //                 sharp(filePath)
//             //                     .resize(500, null, {
//             //                         withoutEnlargement: true
//             //                     })
//             //                     .jpeg({
//             //                         quality: 80,
//             //                         chromaSubsampling: '4:4:4'
//             //                     })
//             //                     .toFile(filePath + '_500.jpg', (err) => {
//             //                         if (err) {
//             //                             console.error('Error while resizing image to width 500px:', err);
//             //                         }
//             //                     });
//             //             } else {
//             //                 console.log('Image width is less than 50px. No resizing is performed.');
//             //                 let errorMessage = "Kích thước hình ảnh phải rộng hơn 50px";
//             //                 req.errorMessage = errorMessage;
//             //             }
//             //         })
//             //         .catch(err => {
//             //             console.error('Error while reading image metadata:', err);
//             //         });

//             //     // Add watermark to image
//             //     // const watermarkPath = './path/to/watermark.png'; // Replace with actual path to watermark image
//             //     // sharp(filePath)
//             //     //     .composite([{ input: watermarkPath }])
//             //     //     .toFile(filePath + '_watermarked.jpg', (err) => {
//             //     //         if (err) {
//             //     //             console.error('Error while adding watermark to image:', err);
//             //     //         }
//             //     //     });
//             // }

//             // const uploadedFile = req.file; // Đảm bảo bạn đã sử dụng Multer cho việc tải lên file

//             // // Lấy kích thước của ảnh
//             // const dimensions = sizeOf(uploadedFile.path);

//             // const width = dimensions.width;
//             // const height = dimensions.height;

//             // // Kiểm tra kích thước của ảnh
//             // if (width < 50 || height < 50) {
//             //     // Kích thước không hợp lệ
//             //     return res.status(400).json({ error: 'Kích thước ảnh phải lớn hơn 50x50 pixels' });
//             // }

//         }
//     }).single('product_image');

//     // Thực hiện tải lên và xử lý ảnh
//     upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             if (err.code === 'LIMIT_FILE_SIZE') {
//                 req.errorMessage = 'Kích thước hình ảnh vượt quá giới hạn cho phép (5MB).';
//             } else {
//                 req.errorMessage = 'Lỗi tải lên tệp tin.';
//             }
//         } else if (err) {
//             req.errorMessage = 'Chỉ chấp nhận các tệp tin .jpg, .jpeg và .png';
//         }

//         next();
//     });
// };

// module.exports = { uploadWithProcessing };

const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const sizeOf = require('image-size');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/hinhanhtaive');
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, uuidv4() + ext);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExt = path.extname(file.originalname);

        if (allowedExtensions.includes(fileExt)) {
            callback(null, true);
        } else {
            callback(new Error('Chỉ chấp nhận các tệp tin .jpg, .jpeg và .png'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

const uploadWithProcessing = (req, res, next) => {
    upload.array('product_image', 5)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                req.errorMessage = 'Kích thước hình ảnh vượt quá giới hạn cho phép (5MB).';
            } else {
                req.errorMessage = 'Lỗi tải lên tệp tin.';
            }
        } 
        //else if (err) {
        //     req.errorMessage = 'Chỉ chấp nhận các tệp tin .jpg, .jpeg và .png';
        // }

        if (req.file) {
            req.files.forEach(file => {
                const filePath = file.path;
                // Kiểm tra width của ảnh
                const dimensions = sizeOf(filePath);
                const width = dimensions.width;
                const height = dimensions.height;

                if (width < 50 || height < 50) {
                    req.errorMessage = 'Kích thước ảnh phải lớn hơn 50x50 pixels.';
                }

            });
            // const filePath = req.file.path;


        }

        next();
    });
};

module.exports = { uploadWithProcessing };
