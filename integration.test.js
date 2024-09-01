QUnit.config.reorder = false;

let random = Math.floor(Math.random() * 10000);

let baseUrl = 'http://localhost:3030/';

const user = {
    email: `abv${random}@abv.bg`,
    password: `123456`
}

let userId = ""
let token = ""

const album = {
    name: `"Random album title_${random}"`,
    artist: "Unknown",
    description: `Description ${random}`,
    genre: "Random genre",
    imgUrl: "/images/pinkFloyd.jpg",
    price: "15.25",
    releaseDate: "29 June 2024"
}

let albumId = ""

QUnit.module(`#1 USER FUNCTIONALITIES`, function () {
    QUnit.test(`#1.1 Register`, async (assert) => {
        let path = 'users/register'

        let response = await fetch(baseUrl + path, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        assert.ok(response.ok, `User ${user.email} successfully registered`)
        let json = await response.json();
        console.log(json)
        assert.ok(json.hasOwnProperty('email'), 'Email exists')
        assert.ok(json.hasOwnProperty('password'), 'Password exists')
        assert.ok(json.hasOwnProperty('accessToken'), 'accessToken exists')
        assert.ok(json.hasOwnProperty('_createdOn'), 'createdOn exists')
        assert.ok(json.hasOwnProperty('_id'), 'id exists')

        assert.equal(typeof json.email, 'string', 'Email has expected type')
        assert.equal(typeof json.password, 'string', 'Password has expected type')
        assert.equal(typeof json.accessToken, 'string', 'accessToken has expected type')
        assert.equal(typeof json._createdOn, 'number', '_createdOn has expected type')
        assert.equal(typeof json._id, 'string', '_id has expected type')

        assert.strictEqual(json.email, user.email, 'Email has expected value')
        assert.strictEqual(json.password, user.password, 'Password has expected value')

        userId = json._id
        token = json.accessToken
        sessionStorage.setItem('event-user', JSON.stringify(user))
    })

    QUnit.test(`#2.2 Login`, async (assert) => {
        let path = 'users/login'

        let response = await fetch(baseUrl + path, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        assert.ok(response.ok, `User ${user.email} successfully logged in`)
        let json = await response.json();
        console.log(json)

        assert.ok(json.hasOwnProperty('email'), 'Email exists')
        assert.ok(json.hasOwnProperty('password'), 'Password exists')
        assert.ok(json.hasOwnProperty('accessToken'), 'accessToken exists')
        assert.ok(json.hasOwnProperty('_createdOn'), 'createdOn exists')
        assert.ok(json.hasOwnProperty('_id'), 'id exists')

        assert.equal(typeof json.email, 'string', 'Email has expected type')
        assert.equal(typeof json.password, 'string', 'Password has expected type')
        assert.equal(typeof json.accessToken, 'string', 'accessToken has expected type')
        assert.equal(typeof json._createdOn, 'number', '_createdOn has expected type')
        assert.equal(typeof json._id, 'string', '_id has expected type')

        assert.strictEqual(json.email, user.email, 'Email has expected value')
        assert.strictEqual(json.password, user.password, 'Password has expected value')
    })
})

QUnit.module(`#2 ALBUM FUNCTIONALITIES`, function () {
    QUnit.test(`#2.1 Get all albums`, async (assert) => {
        let path = 'data/albums'
        let queryParam = '?sortBy=_createdOn%20desc&distinct=name'

        let response = await fetch(baseUrl + path + queryParam)
        assert.ok(response.ok, 'All Albums accessible')
        let json = await response.json()
        console.log(json)

        assert.ok(Array.isArray(json), "Response is Array")

        json.forEach(album => {
            assert.ok(album.hasOwnProperty('artist'), "Artist exists")
            assert.ok(album.hasOwnProperty('description'), "Description exists")
            assert.ok(album.hasOwnProperty('genre'), "genre exists")
            assert.ok(album.hasOwnProperty('imgUrl'), "imageUrl exists")
            assert.ok(album.hasOwnProperty('name'), "name exists")
            assert.ok(album.hasOwnProperty('price'), "price exists")
            assert.ok(album.hasOwnProperty('releaseDate'), "releaseDate exists")
            assert.ok(album.hasOwnProperty('_createdOn'), "_createdOn exists")
            assert.ok(album.hasOwnProperty('_id'), "_id exists")
            assert.ok(album.hasOwnProperty('_ownerId'), "_ownerId exists")

            assert.equal(typeof album.artist, 'string', 'Artist has expected type')
            assert.equal(typeof album.description, 'string', 'description has expected type')
            assert.equal(typeof album.genre, 'string', 'genre has expected type')
            assert.equal(typeof album.imgUrl, 'string', 'imgUrl has expected type')
            assert.equal(typeof album.name, 'string', 'name has expected type')
            assert.equal(typeof album.price, 'string', 'price has expected type')
            assert.equal(typeof album.releaseDate, 'string', 'releaseDate has expected type')
            assert.equal(typeof album._createdOn, 'number', '_createdOn has expected type')
            assert.equal(typeof album._id, 'string', '_id has expected type')
            assert.equal(typeof album._ownerId, 'string', '_ownerId has expected type')
        });

    })

    QUnit.test(`#2.2 Create album`, async (assert) => {
        let path = 'data/albums'

        let response = await fetch(baseUrl + path, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(album)
        })

        assert.ok(response.ok, `Album ${album.name} successfully created`)
        let json = await response.json()
        console.log(json)

        assert.ok(json.hasOwnProperty('artist'), "Artist exists")
        assert.ok(json.hasOwnProperty('description'), "Description exists")
        assert.ok(json.hasOwnProperty('genre'), "genre exists")
        assert.ok(json.hasOwnProperty('imgUrl'), "imageUrl exists")
        assert.ok(json.hasOwnProperty('name'), "name exists")
        assert.ok(json.hasOwnProperty('price'), "price exists")
        assert.ok(json.hasOwnProperty('releaseDate'), "releaseDate exists")
        assert.ok(json.hasOwnProperty('_createdOn'), "_createdOn exists")
        assert.ok(json.hasOwnProperty('_id'), "_id exists")
        assert.ok(json.hasOwnProperty('_ownerId'), "_ownerId exists")

        assert.equal(typeof json.artist, 'string', 'Artist has expected type')
        assert.equal(typeof json.description, 'string', 'description has expected type')
        assert.equal(typeof json.genre, 'string', 'genre has expected type')
        assert.equal(typeof json.imgUrl, 'string', 'imgUrl has expected type')
        assert.equal(typeof json.name, 'string', 'name has expected type')
        assert.equal(typeof json.price, 'string', 'price has expected type')
        assert.equal(typeof json.releaseDate, 'string', 'releaseDate has expected type')
        assert.equal(typeof json._createdOn, 'number', '_createdOn has expected type')
        assert.equal(typeof json._id, 'string', '_id has expected type')
        assert.equal(typeof json._ownerId, 'string', '_ownerId has expected type')

        assert.strictEqual(json.artist, album.artist, 'Album has expected value')
        assert.strictEqual(json.description, album.description, 'description has expected value')
        assert.strictEqual(json.genre, album.genre, 'genre has expected value')
        assert.strictEqual(json.imgUrl, album.imgUrl, 'imgUrl has expected value')
        assert.strictEqual(json.name, album.name, 'name has expected value')
        assert.strictEqual(json.price, album.price, 'price has expected value')
        assert.strictEqual(json.releaseDate, album.releaseDate, 'price has expected value')

        albumId = json._id

    })

    QUnit.test(`#2.3 Edit Album`, async (assert) => {
        let path = `data/albums/`
        let queryParam = `${albumId}`

        album.artist = `EDITED Artist ${random}`
        album.description = `EDITED description ${random}`
        album.genre = `EDITED genre ${random}`
        album.name = `EDITED name ${random}`
        album.price = `${random}`

        let response = await fetch(baseUrl + path + queryParam, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(album)
        })

        assert.ok(response.ok, `Album with ID ${albumId} successfully EDITED`)
        let json = await response.json()
        console.log(json)

        assert.ok(json.hasOwnProperty('artist'), "Artist exists")
        assert.ok(json.hasOwnProperty('description'), "Description exists")
        assert.ok(json.hasOwnProperty('genre'), "genre exists")
        assert.ok(json.hasOwnProperty('imgUrl'), "imageUrl exists")
        assert.ok(json.hasOwnProperty('name'), "name exists")
        assert.ok(json.hasOwnProperty('price'), "price exists")
        assert.ok(json.hasOwnProperty('releaseDate'), "releaseDate exists")
        assert.ok(json.hasOwnProperty('_createdOn'), "_createdOn exists")
        assert.ok(json.hasOwnProperty('_id'), "_id exists")
        assert.ok(json.hasOwnProperty('_ownerId'), "_ownerId exists")

        assert.equal(typeof json.artist, 'string', 'Artist has expected type')
        assert.equal(typeof json.description, 'string', 'description has expected type')
        assert.equal(typeof json.genre, 'string', 'genre has expected type')
        assert.equal(typeof json.imgUrl, 'string', 'imgUrl has expected type')
        assert.equal(typeof json.name, 'string', 'name has expected type')
        assert.equal(typeof json.price, 'string', 'price has expected type')
        assert.equal(typeof json.releaseDate, 'string', 'releaseDate has expected type')
        assert.equal(typeof json._createdOn, 'number', '_createdOn has expected type')
        assert.equal(typeof json._id, 'string', '_id has expected type')
        assert.equal(typeof json._ownerId, 'string', '_ownerId has expected type')

        assert.strictEqual(json.artist, album.artist, 'Album has expected value')
        assert.strictEqual(json.description, album.description, 'description has expected value')
        assert.strictEqual(json.genre, album.genre, 'genre has expected value')
        assert.strictEqual(json.imgUrl, album.imgUrl, 'imgUrl has expected value')
        assert.strictEqual(json.name, album.name, 'name has expected value')
        assert.strictEqual(json.price, album.price, 'price has expected value')
        assert.strictEqual(json.releaseDate, album.releaseDate, 'releaseDate has expected value')
    })

    QUnit.test(`#2.4 Delete Album`, async (assert) => {
        let path = `data/albums/`
        let queryParam = `${albumId}`

        let response = await fetch(baseUrl + path + albumId, {
            method: "DELETE",
            headers: {
                'X-Authorization': token
            }
        })
        assert.ok(response.ok, `Album with ID ${albumId} successfully DELETED`)

        let json = await response.json()
        console.log(json)
        assert.ok(json.hasOwnProperty('_deletedOn'),'_deletedOn key exists in the response')
    })

})

