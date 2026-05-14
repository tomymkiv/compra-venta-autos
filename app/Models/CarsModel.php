<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarsModel extends Model
{
    protected $casts = [
        'id_marca' => 'integer',
    ];
    protected $fillable = ['id_marca', 'modelo'];

    // Un modelo puede tener varios autos registrados (ej: varias unidades del mismo modelo)
    // FK en cars: id_modelo → cars_models.id
    public function cars()
    {
        return $this->hasMany(Car::class, 'id_modelo');
    }
    public function carBrand()
    {
        return $this->belongsTo(CarsBrand::class, 'id_marca');
        // si o si hay que especificarle que la FK es "id_marca", porque puede pasar que Tinker busque las relaciones con otros nombres
    }
}
