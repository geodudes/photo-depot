## About
Photo Depot is a personal photo repository and Chrome extension.  
* Users load the extension and save image links to their personal database (PostgreSQL) through the Photo Depot context menu button
* Images are deposited into the Photo Depot website in real-time through websockets where they can be organized, tagged, and filtered.
## Getting Started
### Prerequisites
Ensure that you are running the latest version of npm
```sh
npm install npm@latest -g
```
### Installation
1. Clone the repo
```sh
git clone https://github.com/geodudes/photo-depot.git
```
2. Install NPM packages
```sh
npm install
```
3. Create a `.env` and save your PostgreSQL URI:
```sh
PG_URI=<Insert URI>
```
## Testing
Testing is implemented through Jest and Supertest.  Configurations are found in `__tests__` at the root directory.
Run the following terminal command to execute:
```sh
npm run test
```
## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
