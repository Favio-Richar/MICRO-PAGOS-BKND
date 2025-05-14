export interface PaymentPort {
    CreateTransaction(input: {
        amount: number;
        buyOrder: string;
        sessionId: string;
        returnUrl: string;
    }): Promise<any>;
}