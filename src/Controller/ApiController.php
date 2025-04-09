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
            $parsedRunes[] = [
                'name' => $rune->getName(),
                'tier' => $rune->getTier(),
                'img' => $rune->getImg(),
            ];
        }

        return $this->json($parsedRunes);
    }

    #[Route('/api/rune/{rune}', name: 'app_api_rune',methods:['GET'])]
    public function getRune(string $rune ,RuneRepository $runeRepo): JsonResponse
    {
        
        $runeData = $runeRepo->findOneBy(['name' => $rune]);
        
        $data=[
            'id' => $runeData->getId(),
            'tier' => $runeData->getTier(),
            'tree' => $runeData->getTree(),
            'name' => $runeData->getName(),
            'img' => $runeData->getImg()
        ];
        return $this->json($data);
    }
}
