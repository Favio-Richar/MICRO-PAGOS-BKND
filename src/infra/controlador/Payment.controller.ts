import { Body, Controller, Post, Get, Req, Res } from "@nestjs/common";
import { Request, Response as ExpressResponse } from "express";
import { WebpayPlus, Options } from "transbank-sdk";
import axios from "axios";

const options = new Options(
  '597055555532',
  '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
  'https://webpay3gint.transbank.cl'
);

@Controller('payment')
export class PaymentController {

  @Post()
  async create(@Body() body: any) {
    const { amount, buyOrder, sessionId, returnUrl } = body;

    const tx = new WebpayPlus.Transaction(options);
    const result = await tx.create(buyOrder, sessionId, amount, returnUrl);

    return {
      token: result.token,
      url: result.url,
      redirectFrontendUrl: `http://localhost:4200/pago?token=${result.token}`
    };
  }

  @Get('response')
async confirm(@Req() req: Request, @Res() res: ExpressResponse) {
  const token = req.query.token_ws as string;

  try {
    const response = await axios.put(
      `https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`,
      {},
      {
        headers: {
          "Tbk-Api-Key-Id": "597055555532",
          "Tbk-Api-Key-Secret": "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C",
          "Content-Type": "application/json"
        }
      }
    );

    // 🔍 Verificamos si fue autorizada
    const status = response.data.status;
    if (status === 'AUTHORIZED') {
      return res.redirect(`http://localhost:4200/success?id=${token}`);
    } else {
      return res.redirect(`http://localhost:4200/error?id=${token}`);
    }
  } catch (error) {
    // ❌ Error técnico (network o token inválido)
    return res.redirect(`http://localhost:4200/error?id=${token}`);
  }
}

}
