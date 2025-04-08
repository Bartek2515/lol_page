<?php

namespace App\Controller;

use App\Repository\ChampionRepository;
use App\Repository\RuneRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ApiController extends AbstractController
{
    #[Route('/api/champions/{laneName}', name: 'app_api_champions',methods:['GET'])]
    public function getChampions(string $laneName, ChampionRepository $championRepo): JsonResponse
    {
        $champions = $championRepo->findBy(['role' => $laneName]);
        
        // Przekształć tablicę obiektów Champion na tablicę nazw
        $names = array_map(fn($champion) => $champion->getName(), $champions);

        return $this->json($names);
    }
    
    #[Route('/api/runes/{tree}', name: 'app_api_runes',methods:['GET'])]
    public function getRunes(string $tree,RuneRepository $runeRepo): JsonResponse
    {
        $runes = $runeRepo->findBy(['tree' => $tree]);
        
        // Przekształć tablicę obiektów Champion na tablicę nazw
        // $names = array_map(fn($rune) => $rune->getName(), $runes);
        $parsedRunes = [];
        foreach ($runes as $rune){
            $a = [];
            array_push($a, $rune->getName(),$rune->getTier());
            
            array_push($parsedRunes, $a);
        }

        return $this->json($parsedRunes);
    }
}
