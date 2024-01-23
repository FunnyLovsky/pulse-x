import { Instrument } from '../api/Enums';

export const formatInstrument = (instrument: number) => {
    switch (instrument) {
        case Instrument.eur_usd:
            return ['EUR', 'USD'];
        case Instrument.eur_rub:
            return ['EUR', 'RUB'];
        case Instrument.usd_rub:
            return ['USD', 'RUB'];
        default:
            return [];
    }
};
