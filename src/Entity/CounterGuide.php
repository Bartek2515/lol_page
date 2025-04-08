<?php

namespace App\Entity;

use App\Repository\CounterGuideRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CounterGuideRepository::class)]
class CounterGuide
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $notes = null;

    #[ORM\Column(length: 255)]
    private ?string $role = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Users $user = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Champion $champion = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Champion $targetChampion = null;

    /**
     * @var Collection<int, Rune>
     */
    #[ORM\ManyToMany(targetEntity: Rune::class)]
    #[ORM\JoinTable(name: 'counter_guide_runes')]
    private Collection $runes;

    /**
     * @var Collection<int, Rune>
     */
    #[ORM\ManyToMany(targetEntity: Rune::class)]
    #[ORM\JoinTable(name: 'counter_guide_secondary_runes')]
    private Collection $secondaryRunes;

    public function __construct()
    {
        $this->runes = new ArrayCollection();
        $this->secondaryRunes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNotes(): ?string
    {
        return $this->notes;
    }

    public function setNotes(?string $notes): static
    {
        $this->notes = $notes;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): static
    {
        $this->role = $role;

        return $this;
    }

    public function getUser(): ?Users
    {
        return $this->user;
    }

    public function setUser(?Users $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getChampion(): ?Champion
    {
        return $this->champion;
    }

    public function setChampion(?Champion $champion): static
    {
        $this->champion = $champion;

        return $this;
    }

    public function getTargetChampion(): ?Champion
    {
        return $this->targetChampion;
    }

    public function setTargetChampion(?Champion $targetChampion): static
    {
        $this->targetChampion = $targetChampion;

        return $this;
    }

    /**
     * @return Collection<int, Rune>
     */
    public function getRunes(): Collection
    {
        return $this->runes;
    }

    public function addRune(Rune $rune): static
    {
        if (!$this->runes->contains($rune)) {
            $this->runes->add($rune);
        }

        return $this;
    }

    public function removeRune(Rune $rune): static
    {
        $this->runes->removeElement($rune);

        return $this;
    }

    /**
     * @return Collection<int, Rune>
     */
    public function getSecondaryRunes(): Collection
    {
        return $this->secondaryRunes;
    }

    public function addSecondaryRune(Rune $secondaryRune): static
    {
        if (!$this->secondaryRunes->contains($secondaryRune)) {
            $this->secondaryRunes->add($secondaryRune);
        }

        return $this;
    }

    public function removeSecondaryRune(Rune $secondaryRune): static
    {
        $this->secondaryRunes->removeElement($secondaryRune);

        return $this;
    }
}
