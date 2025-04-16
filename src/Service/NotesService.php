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
            $secondaryRunes = $counterGuide->getSecondaryRunes()->toArray();
            
            $result[] = [
                'counterGuide' => $counterGuide,              // Obiekt CounterGuide
                'runes' => $runes, // Tablica run
                'secondaryRunes' => $secondaryRunes
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
            $secondaryRunes = $counterGuide->getSecondaryRunes()->toArray();

            $result[] = [
                'counterGuide' => $counterGuide,              // Obiekt CounterGuide
                'runes' => $runes, // Tablica run
                'secondaryRunes' => $secondaryRunes
            ];
        }

        return $result;
    }
    
    public function addCounterGuide($formData,$user)
    {
        $newCounterGuide = new CounterGuide();
        $newCounterGuide->setRole($formData['role']);
        $newCounterGuide->setChampion($this->championRepo->findOneby(['name' => $formData['champion']]));
        $newCounterGuide->setTargetChampion($this->championRepo->findOneby(['name' => $formData['targetChampion']]));
        $newCounterGuide->setNotes($formData['notes']);
        $newCounterGuide->setUser($user);
        
        foreach($formData['runes'] as $rune){
            $newCounterGuide->addRune($this->runeRepo->findOneBy(['name' => $rune]));
        }
        // $runes =[
        //     $this->runeRepo->findOneBy(['name' => $formData['rune1']]),
        //     $this->runeRepo->findOneBy(['name' => $formData['rune2']]),
        //     $this->runeRepo->findOneBy(['name' => $formData['rune3']]),
        //     $this->runeRepo->findOneBy(['name' => $formData['rune4']]),    
        // ];
        $secondaryRunes = [
            $this->runeRepo->findOneBy(['name' => 'nimbus cloak']),
            $this->runeRepo->findOneBy(['name' => 'scorch']),
            $this->runeRepo->findOneBy(['name' => '+10% atack speed','tree' => 'offense']),
            $this->runeRepo->findOneBy(['name' => '+9 adaptive force','tree' => 'flex']),
            $this->runeRepo->findOneBy(['name' => '+65 health','tree' => 'defense']),
        ];
        
        // foreach ($runes as $rune) {
        //     $newCounterGuide->addRune($rune);
            
        // }
        foreach ($secondaryRunes as $rune){
            $newCounterGuide->addSecondaryRune($rune);
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
    public function getRunesByTier($tier)
    {
        return $this->runeRepo->findBy(['tier' => $tier]);
    }
    public function editCounterGuide($formData,$id)
    {
        $counterGuide = $this->counterRepo->find($id);
        if ($counterGuide) {
            $counterGuide->setRole($formData['role']);
            $counterGuide->setChampion($this->championRepo->findoneby(['name' => $formData['champion']]));
            $counterGuide->setTargetChampion($this->championRepo->findoneby(['name' => $formData['targetChampion']]));
            $counterGuide->setNotes($formData['notes']);
            
            $runes =[
                $this->runeRepo->findOneBy(['name' => $formData['rune1']]),
                $this->runeRepo->findOneBy(['name' => $formData['rune2']]),
                $this->runeRepo->findOneBy(['name' => $formData['rune3']]),
                $this->runeRepo->findOneBy(['name' => $formData['rune4']]),   
            ];
            
            foreach ($runes as $rune) {
                $counterGuide->addRune($rune);
            }
    
            $this->entityManager->persist($counterGuide);
            $this->entityManager->flush();
        }
    }
}