# hognswap

**How To Setup Hog N’ Swap**

1.	Make sure Node.js is installed on your machine and that you can run `npm` command in your preferred terminal.

2.	Extract project files from ZIP.

3.	Run the client and the server in two separate windows.

    a.	To initialize client and server, open each folder in a terminal window and run the following commands.
   
    b.	`npm init`
    
    c.	`npm install`

4.	The connection URI is: 
MONGO_URI = "mongodb+srv://hogAdmin:gimmiemyscreen@atlascluster.dqcdq7g.mongodb.net/hognswap?retryWrites=true&w=majority" (THIS WILL BE STORED IN AN .env FILE WITHIN THE SERVER FOLDER)

5.	If Linux based, npm start should just work on the client side. 

    a.	If on Windows open package.json in the client side, find scripts: and edit “start” field value to be --> `set PORT=3000 && react-scripts start`,

  	b.	After this change, `npm start` should work on Windows.

7.	For the server use `npm run dev`.

a.	You should see the following output if connected:
`Server started on port 8000
Connected to MongoDB`

7.	You can register and login into an account once the page comes up. Then you can interact with the swiper/buttons or click on the profile to upload your own pictures.

For any additional concerns or difficulty setting up the site, email moncktonj@wit.edu or call me at 860-816-9513
