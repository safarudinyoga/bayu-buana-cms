# STARTING DEVELOPMENT

1. Standar pengkodingan menggunakan functional component
2. Penamaan variabel
3. Untuk struktur folder sudah disiapkan, masing-masing modul dibuat folder tersendiri di masing-masing folder induknya, contoh modul master aircraft, di views akan ada folder master data, dan di dalamnya ada folder aircraft
4. Untuk style jika style itu bisa dipakai dibanyak tempat, bisa dibuat global, jika spesifik hanya di layout tertentu, buat file style didalam folder modul tersebut
5. Readme ini bisa disesuaikan sewaktu-waktu



# PANDUAN PENULISAN VARIABEL
- Nama variabel ditulis dalam format camelCase diawali dengan lowercase pada karakter awal.
- Nama variabel harus relevan dan memiliki arti yang jelas.
- Nama variabel tidak boleh mengandung sara.
- Nama variabel harus ditulis dalam bahasa Inggris.
- Nama variabel harus konsisten di semua fungsi jika tipe data atau maksudnya sama
- Nama variabel disarankan untuk tidak disingkat kecuali istilah atau singkatan
- Variabel yang berupa konstanta atau kekal harus dalam huruf kapital atau uppercase
- Untuk variabel global tambahkan komentar diatas nama variabel tersebut.



# Development Cycle

## ***\*1. Update dari branch master\****

Pastikan setiap memulai pekerjaan wajib pull versi terbaru dari branch master.

## ***\*2. Memulai pekerjaan\****

Setelah pull dilakukan, pastikan branch sudah diperbarui. Buat branch sesuai dengan developer

## ***\*3. Push pekerjaan\****

Jika telah selesai mengerjakan pekerjaan, commit dengan message "modul yg dikerjakan", kemudian push ke branch masing - masing developer

## ***\*4. Merge\****

Lakukan proses merge request untuk dilakukan proses merging dan dilakukan pengecekan, apakah modul yg dikerjakan sudah sesuai atau perlu perbaikan



# Folder Structure

## ***\*src\****

folder ini merupakan folder utama yang menampung semua assets, component,config, views dan sebagainya.

### ***\*assets\****

berisi kebutuhan untuk gambar maupun style

### ***\*components\****

berisi kebutuhan-kebutuhan component pendukung yang sifatnya reusable.

### ***\*config\****

berisi konfigurasi yang berkaitan dengan API.

### ***\*redux\****

berisi konfigurasi untuk state management di react. folder actions untuk koneksi ke api, reducers untuk membuat reducer, store untuk mendaftarkan reducers

### ***\*views\****

berisi kebutuhan untuk tampilan layout aplikasi web.

### ***\*.gitignore\****

file ini berfungsi untuk mengabaikan beberapa item yang tidak dibutuhkan saat dikirim ke repository.

### ***\*.gitlab-ci.yml\****

file ini merupakan konfigurasi ci/cd untuk gitlab.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
