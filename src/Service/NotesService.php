<?php

namespace App\Service;

use App\Repository\CounterGuideRepository;

class NotesService
{
    public function __construct(private CounterGuideRepository $counterRepo){
        
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
}