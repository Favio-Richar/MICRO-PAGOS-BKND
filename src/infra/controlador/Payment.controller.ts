import { Body, Controller, Post } from "@nestjs/common";
import { CreatePaymentUseCase } from "../../app/use-cases/CreatePaymentUseCase";


@Controller('payment')
export class PaymentController {
    constructor( private readonly createPayment:CreatePaymentUseCase) {}
        
    @Post()
    async create(@Body() body:any){
        try {
            return await this.createPayment.execute({
                amount: body.amount,
                buyOrder: body.buyOrder,
                sessionId: body.sessionId,
                returnUrl: body.returnUrl
            });
        } catch (error) {
            console.error('Error creating payment:', error);
            throw new Error('Error creating payment');
        }
    }
}