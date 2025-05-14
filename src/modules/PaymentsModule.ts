import { Module } from "@nestjs/common";
import { CreatePaymentUseCase } from "src/app/use-cases/CreatePaymentUseCase";
import { TransbankAdapter } from "src/infra/adapters/transbank/TransbankAdapter";
import { TransbankService } from "src/infra/adapters/transbank/TransbankService";
import { PaymentController } from "src/infra/controlador/Payment.controller";

@Module({
    controllers: [PaymentController],
    providers: [
    TransbankService,
    TransbankAdapter,
    {
        provide: 'PaymentPort',
        useExisting: TransbankAdapter
    },
    CreatePaymentUseCase,
    ]
})
export class PaymentsModule {}