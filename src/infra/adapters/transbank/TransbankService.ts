import { Options, WebpayPlus } from "transbank-sdk";

export class TransbankService {

    private options:Options;
    constructor() {
        this.options=new Options(
            '597055555532', // commerceCode
            '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', // apiKey
            'https://webpay3gint.transbank.cl' // integration URL (TEST)
        );
    }
    async createTransaction(
        amount: number,
        buyOrder: string,
        sessionId: string,
        returnUrl: string
    ) {
        const transaction= new WebpayPlus.Transaction(this.options);
        return await transaction.create(
            buyOrder,
            sessionId,
            amount,
            returnUrl
        );
    }

}