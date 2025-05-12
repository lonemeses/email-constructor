const express = require('express');
const cors = require('cors');
const {FSDB} = require('file-system-db')
const { v4: uuidv4} = require('uuid')

const app = express();
const PORT = 3001;
const db = new FSDB()

app.use(cors());
app.use(express.json());

// Получить объект пользователя по имени (или undefined)
const getUser = (username) => db.get(`users.${username}`);

// Сохранить/обновить пользователя
const saveUser = (username, userObj) => {
    db.set(`users.${username}`, userObj);
};

// Проверить сессию и вернуть имя пользователя или null
const getUsernameBySession = (token) => db.get(`sessions.${token}`);


// Регистрация
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (getUser(username)) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    saveUser(username, {
        id: Date.now(),
        username,
        password,
        templates: [
            {
                id: 1,
                name: 'рыбы',
                template: [
                    {id: 1, type: 'text', text: [{type: 'heading-one', children: [{text: 'Сколько рыб есть в мире?'}]}]},
                    {id: 2, type: 'image', src: 'https://avatars.mds.yandex.net/i?id=d3b67a295b7bb9aa0edfd92fcf9d2b6e_l-10109607-images-thumbs&n=13', label: 'Рыба-даун'},
                    {id: 3, type: "text", text: [{type: 'heading-two', children: [{text: 'Сколько рыб-даунов водится в России?'}]}]},
                    {id: 4, type: 'text', text: [{type: 'paragraph', children: [{text: 'По нашим'}, {text: 'скромным', bold: true}, {text: 'подсчётам, в России около тысячи рыб даунов'}]}]}
                ]
            },
            {
                id: 2,
                name: 'котёнок',
                template: [
                    {id: 1, type: 'image', src: 'https://i.pinimg.com/736x/80/c1/e3/80c1e352cf033fbc258efcc88949c45e.jpg', label: 'Это просто котёнок'},
                    {id: 2, type: "text", text: [{type: 'heading-one', children: [{text: 'Это'}, {text: 'упоротый', italic: true}, {text: 'котёнок', underline: true}]}]}
                ]
            }
        ]
    });

    return res.json({ message: 'Регистрация успешна, пожалуйста войдите в аккаунт' });
});

// Логин
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = getUser(username);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Неверные данные' });
    }

    const sessionToken = uuidv4();
    db.set(`sessions.${sessionToken}`, username);

    res.json({ token: sessionToken });
});

// Получить шаблоны текущего пользователя
app.get('/me', (req, res) => {
    const token = req.headers.authorization;
    const username = getUsernameBySession(token);

    if (!username) {
        return res.status(401).json({ message: 'Нет доступа' });
    }

    const user = getUser(username);
    res.json({username: user.username, templates: user.templates});
});

// Сохранить новый шаблон
app.post('/templates', (req, res) => {
    const token = req.headers.authorization;
    const { templates } = req.body;
    const username = getUsernameBySession(token);

    if (!username) {
        return res.status(401).json({ message: 'Нет доступа' });
    }

    const user = getUser(username);
    user.templates = templates
    saveUser(username, user);

    res.json({ message: 'Шаблоны сохранёны' });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
