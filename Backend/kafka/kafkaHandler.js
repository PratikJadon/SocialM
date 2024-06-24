const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'], // Replace with your Kafka broker(s) address
    logLevel: logLevel.NOTHING,
});

let producer = null;

const connectProducer = async () => {
    if (producer) return producer;

    const _producer = kafka.producer()
    await _producer.connect()
    producer = _producer;
    console.log('Connected to Kafka producer');
    return producer;
};

const sendMessageToKafka = async (topic, message) => {
    const producer = await connectProducer();
    try {
        await producer.send({
            topic: topic,
            messages: [
                { value: JSON.stringify(message) }
            ],
        });
        console.log('Message sent to Kafka:', message);
    } catch (error) {
        console.error('Error sending message to Kafka:', error);
    }
};


module.exports = {
    kafka,
    connectProducer,
    sendMessageToKafka,
};
