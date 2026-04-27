<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class PropertyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();
        return ['id'=>$this->id,'host_id'=>$this->host_id,'slug'=>$this->slug,'business_name'=>$this->business_name,'logo_url'=>$this->logo_url,'facade_image_url'=>$this->facade_image_url,'services'=>$this->services ?? [],'title'=>$this->{"title_{$locale}"},'description'=>$this->{"description_{$locale}"},'title_es'=>$this->title_es,'title_en'=>$this->title_en,'description_es'=>$this->description_es,'description_en'=>$this->description_en,'price_per_night'=>$this->price_per_night,'cleaning_fee'=>$this->cleaning_fee,'max_guests'=>$this->max_guests,'city'=>$this->city,'country'=>$this->country,'lat'=>$this->lat,'lng'=>$this->lng,'status'=>$this->status,'images'=>$this->images ?? [],'rating_avg'=>$this->reviews_avg_rating,'is_blocked'=>$this->is_blocked];
    }
}
