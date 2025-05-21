import { Controller, Post, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConfirmTransactionUseCase } from 'src/app/use-cases/ConfirmTransaction.use-case';

@Controller('transactions')
export class ConfirmTransactionController {
  private readonly useCase = new ConfirmTransactionUseCase();

  @Post(':id/confirm')
  async confirm(@Param('id') id: string, @Res() res: Response) {
    try {
      const url = await this.useCase.execute(id);
      return res.redirect(302, url);  // ✅ redirección al frontend Angular
    } catch (error) {
      return res.redirect(302, `http://localhost:4200/error?id=${id}`);  // redirige al componente error
    }
  }
}
