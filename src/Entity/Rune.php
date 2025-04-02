<?php

namespace App\Entity;

use App\Repository\RuneRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RuneRepository::class)]
class Rune
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $tier = null;

    #[ORM\Column(length: 255)]
    private ?string $tree = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTier(): ?int
    {
        return $this->tier;
    }

    public function setTier(int $tier): static
    {
        $this->tier = $tier;

        return $this;
    }

    public function getTree(): ?string
    {
        return $this->tree;
    }

    public function setTree(string $tree): static
    {
        $this->tree = $tree;

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
}
