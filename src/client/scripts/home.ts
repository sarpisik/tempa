import '../styles/home.scss';

class Message {
    print() {
        console.log('Hello world!');
    }
}

async function asyncMessage() {
    await console.log('Hello async world!');
}

asyncMessage();
new Message().print();
