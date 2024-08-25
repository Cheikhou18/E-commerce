<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $id_features = null;

    #[ORM\Column]
    private ?int $id_category = null;

    #[ORM\Column(length: 60)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $image = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\Column]
    private ?int $popularity = null;

    #[ORM\Column]
    private ?int $stock = null;

    #[ORM\Column(type: Types::BOOLEAN)]
    private bool $recommended = false;

    #[ORM\Column(length: 255)]
    private ?string $color = null;

    #[ORM\Column(nullable: true)]
    private ?int $discount = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $creation_date = null;

    #[ORM\Column(type: Types::SMALLINT, nullable: true)]
    private ?int $gift_wrapping = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdFeatures(): ?int
    {
        return $this->id_features;
    }

    public function setIdFeatures(?int $id_features): static
    {
        $this->id_features = $id_features;

        return $this;
    }

    public function getIdCategory(): ?int
    {
        return $this->id_category;
    }

    public function setIdCategory(int $id_category): static
    {
        $this->id_category = $id_category;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getPopularity(): ?int
    {
        return $this->popularity;
    }

    public function setPopularity(int $popularity): static
    {
        $this->popularity = $popularity;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    public function getRecommended(): bool
    {
        return $this->recommended;
    }

    public function setRecommended(bool $recommended): static
    {
        $this->recommended = $recommended;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getDiscount(): ?int
    {
        return $this->discount;
    }

    public function setDiscount(?int $discount): static
    {
        $this->discount = $discount;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creation_date;
    }

    public function setCreationDate(\DateTimeInterface $creation_date): static
    {
        $this->creation_date = $creation_date;

        return $this;
    }

    public function getGiftWrapping(): ?int
    {
        return $this->gift_wrapping;
    }

    public function setGiftWrapping(?int $gift_wrapping): static
    {
        $this->gift_wrapping = $gift_wrapping;

        return $this;
    }
}
