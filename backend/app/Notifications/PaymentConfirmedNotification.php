<?php
namespace App\Notifications;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
class PaymentConfirmedNotification extends Notification implements ShouldQueue
{
    use Queueable;
    public function __construct(private Booking $booking) {}
    public function via(object $notifiable): array { return ['mail']; }
    public function toMail(object $notifiable): MailMessage
    {
        app()->setLocale($notifiable->locale ?? 'es');
        return (new MailMessage)->subject(__('messages.payment_confirmed_subject'))->line(__('messages.payment_confirmed_body', ['id' => $this->booking->id]));
    }
}
