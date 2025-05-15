import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { CreatePaymentUseCase } from "../../app/use-cases/CreatePaymentUseCase";
import axios from "axios";

@Controller('payment')
export class PaymentController {
    constructor(private readonly createPayment: CreatePaymentUseCase) {}

    @Post()
    async create(@Body() body: any) {
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

    // ✅ Método de confirmación: Transbank redirige al returnUrl y envía token_ws
    @Post('response')
    async confirm(@Req() req: Request) {
        const token = req.body.token_ws;

        try {
            const response = await axios.put(
                `https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`,
                {}, // body vacío
                {
                    headers: {
                        "Tbk-Api-Key-Id": "597055555532", // Código de comercio
                        "Tbk-Api-Key-Secret": "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C", // API Key
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("✅ Transacción confirmada:", response.data);

            return {
                message: "Transacción confirmada correctamente",
                data: response.data
            };
        } catch (error) {
            console.error("❌ Error al confirmar la transacción:", error.response?.data || error.message);
            return {
                message: "Error al confirmar la transacción",
                error: error.response?.data || error.message
            };
        }
    }
}
