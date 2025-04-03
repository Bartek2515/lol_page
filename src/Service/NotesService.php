<?php

namespace App\Service;

use App\Entity\Champion;
use App\Repository\CounterGuideRepository;
use App\Entity\CounterGuide;
use App\Entity\Rune;
use App\Repository\ChampionRepository;
use Dom\Entity;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\RuneRepository;

class NotesService
{
    public function __construct(private CounterGuideRepository $counterRepo, private ChampionRepository $championRepo,private EntityManagerInterface $entityManager, private RuneRepository $runeRepo)
    {
    }

    public function getCounterGuide($user)
    {
        $userId = $user->getId();
        $counterGuides = $this->counterRepo->findBy(['user' => $userId]);
    
        $result = [];

        foreach ($counterGuides as $counterGuide) {
            $runes = $counterGuide->getRunes()->toArray();

            usort($runes, function ($a, $b) {
                return $a->getTier() <=> $b->getTier(); // Porównanie tierów
            });

            $result[] = [
                'counterGuide' => $counterGuide,              // Obiekt CounterGuide
                'runes' => $runes // Tablica run
            ];
        }

        return $result;      
    }
    
    public function getCounterGuideById($user,$id )
    {
        $result = [];
        $counterGuides = $this->counterRepo->getCounterGuideById($user, $id);
        
        foreach ($counterGuides as $counterGuide) {
            $runes = $counterGuide->getRunes()->toArray();

            usort($runes, function ($a, $b) {
                return $a->getTier() <=> $b->getTier(); // Porównanie tierów
            });

            $result[] = [
                'counterGuide' => $counterGuide,              // Obiekt CounterGuide
                'runes' => $runes // Tablica run
            ];
        }

        return $result;
    }
    
    public function addCounterGuide($formData,$user)
    {
        $newCounterGuide = new CounterGuide();
        $newCounterGuide->setRole($formData['role']);
        $newCounterGuide->setChampion($this->championRepo->findoneby(['name' => $formData['champion']]));
        $newCounterGuide->setTargetChampion($this->championRepo->findoneby(['name' => $formData['targetChampion']]));
        $newCounterGuide->setNotes($formData['notes']);
        $newCounterGuide->setUser($user);

        $runes =[
            $this->runeRepo->findoneby(['name' => $formData['rune1']]),
            $this->runeRepo->findoneby(['name' => $formData['rune2']]),
            $this->runeRepo->findoneby(['name' => $formData['rune3']]),
            $this->runeRepo->findoneby(['name' => $formData['rune4']]),   
        ];
        
        foreach ($runes as $rune) {
            $newCounterGuide->addRune($rune);
        }

        $this->entityManager->persist($newCounterGuide);
        $this->entityManager->flush();
    }
    public function deleteCounterGuide($id)
    {
        $counterGuide = $this->counterRepo->find($id);
        if ($counterGuide) {
            $this->entityManager->remove($counterGuide);
            $this->entityManager->flush();
        }
    }
}