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
            $result[] = [
                'counterGuide' => $counterGuide,              // Obiekt CounterGuide
                'runes' => $counterGuide->getRunes()->toArray() // Tablica run
            ];
        }

        return $result;      
    }
}