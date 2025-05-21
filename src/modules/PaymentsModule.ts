import { Module } from '@nestjs/common';
import { CreatePaymentUseCase } from 'src/app/use-cases/CreatePaymentUseCase';
import { ConfirmTransactionUseCase } from 'src/app/use-cases/ConfirmTransaction.use-case';

import { TransbankAdapter } from 'src/infra/adapters/transbank/TransbankAdapter';
import { TransbankService } from 'src/infra/adapters/transbank/TransbankService';

import { PaymentController } from 'src/infra/controlador/Payment.controller';
import { ConfirmTransactionController } from 'src/infra/controlador/ConfirmTransaction.controller';

@Module({
  controllers: [
    PaymentController,
    ConfirmTransactionController
  ],
  providers: [
    TransbankService,
    TransbankAdapter,
    {
      provide: 'PaymentPort',
      useExisting: TransbankAdapter
    },
    CreatePaymentUseCase,
    ConfirmTransactionUseCase
  ]
})
export class PaymentsModule {}
