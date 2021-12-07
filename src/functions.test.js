import { createEvent } from './functions'
beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2021-12-07T10:20:30Z').getTime())
});

const weekday = "sun";
const week = 2;
const openHour = 8;
const closeHour = 14;
const date = new Date(new Date().setDate(new Date().getDate()))
const NUM_DAY = { 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6, 'sun': 7 };

const result = createEvent(weekday, week, openHour, closeHour);

test('Validation a event title and content basic', () => {
    //TODO: hacer las verificaciones
    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual([(closeHour - openHour), 'hour']);

});

test('Validation start date', () => {
    //TODO: hacer las verificaciones
    const difference = ((NUM_DAY[weekday] - new Date().getDay() + 7 * (week - 1)))
    //Se usa la funcion toUTCString para eliminar los milisegundos y evitar problemas a la hora de ejecutar el test
    expect(result.start.toUTCString()).toEqual((new Date(new Date().setDate(new Date().getDate() + difference))).toUTCString())
});


test('Validation date', () => {
    expect(result.date).toBe("domingo, 19 de diciembre de 2021")
});


test('Validation illegal arguments', () => {
    const weekday = "son";
    const week = -1;
    const openHour =12;
    const closeHour = 3;
    if((closeHour-openHour) < 0|| week < 0 || !Object.keys(NUM_DAY).some(key => key === weekday)){
        const error = () => {
            createEvent(weekday, week, openHour, closeHour); 
        }
        expect(error).toThrow(Error);
    }
    //TODO: hacer las verificaciones
});


test('create an event list of at least 10 events', () => {
    const Eventos = [
        {
            weekday: 'mon',
            week: 2,
            openHour:10,
            closeHour: 12
        },
        {
            weekday: 'tue',
            week: 2,
            openHour:10,
            closeHour: 12
        },
        {
            weekday: 'sat',
            week: 5,
            openHour:12,
            closeHour: 16
        },
        {
            weekday: 'thu',
            week: 1,
            openHour:10,
            closeHour: 11
        },
        {
            weekday: 'sun',
            week: 3,
            openHour: 5,
            closeHour: 7
        },
        {
            weekday: 'fri',
            week: 7,
            openHour: 8,
            closeHour: 10
        },
        {
            weekday: 'sun',
            week: 1,
            openHour: 7,
            closeHour: 11
        },
        {
            weekday: 'tue',
            week: 12,
            openHour: 7,
            closeHour: 14
        }
    ]

    Eventos.map((evento)=>{
         const result = createEvent(evento.weekday,evento.week, evento.openHour, evento.closeHour)
         expect(result.title).toBe("[SOFKA U] Meeting Room");
         expect(result.description).toBe("Mentoring and Practice");
         expect(result.duration).toEqual([(evento.closeHour - evento.openHour), 'hour']);
    })
    //TODO: hacer las verificaciones
});
