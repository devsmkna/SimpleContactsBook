To run this project execute in two different terminals:
- `npm run dev`
- `npx json-server db.json --port=3001`

This project is a fast demo of a contact book web app:
- on the main page shows the contacts saved
- with a plus button can add a new contact
- click on a contact show the contact informations
- a contact can be deleted, edited and added to favourites
- the list can be sorted by name, surname and email; and in asc and desc order
- a simple search bar allows to filter contacts by name and surname

Due to short amount of time this demo dont directly implements a backend infrastructure, but uses a mocked one using json-server
Future implementation could use redis or mongodb databases to store data using a proper backend infrastructure