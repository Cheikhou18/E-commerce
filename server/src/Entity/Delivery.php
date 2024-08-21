<?php

namespace App\Entity;

use App\Repository\DeliveryRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DeliveryRepository::class)]
class Delivery
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 30)]
    private ?string $deliveryType = null;

    #[ORM\Column]
    private ?float $pricePerKM = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDeliveryType(): ?string
    {
        return $this->deliveryType;
    }

    public function setDeliveryType(string $deliveryType): static
    {
        $this->deliveryType = $deliveryType;

        return $this;
    }

    public function getPricePerKM(): ?float
    {
        return $this->pricePerKM;
    }

    public function setPricePerKM(float $pricePerKM): static
    {
        $this->pricePerKM = $pricePerKM;

        return $this;
    }
}
