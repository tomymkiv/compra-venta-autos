<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Mailtrap\Helper\ResponseHelper;
use Mailtrap\MailtrapClient;
use Mailtrap\Mime\MailtrapEmail;
use Symfony\Component\Mime\Address;


Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('send-mail', function () {
    $email = (new MailtrapEmail())
        ->from(new Address('hello@demomailtrap.co', 'Admin de silvetti automotores'))
        ->to(new Address('palazo9845@gmail.com'))
        ->subject('Bienvenido a silvetti automotores!')
        ->category('Integration Test')
        ->text('Enhorabuena por registrarte en silvetti automotores!')
    ;

    $response = MailtrapClient::initSendingEmails(
        apiKey: env('MAILTRAP_API_TOKEN'),
    )->send($email);

    var_dump(ResponseHelper::toArray($response));
})->purpose('Send Mail');