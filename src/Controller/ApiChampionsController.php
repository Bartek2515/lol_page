<?php

namespace App\Controller;

use App\Repository\ChampionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ApiChampionsController extends AbstractController
{
    #[Route('/api/champions/{laneName}', name: 'app_api_champions',methods:['GET'])]
    public function index(string $laneName, ChampionRepository $championRepo): JsonResponse
    {
        $champions = $championRepo->findBy(['role' => $laneName]);
        
        // Przekształć tablicę obiektów Champion na tablicę nazw
        $names = array_map(fn($champion) => $champion->getName(), $champions);

        return $this->json($names);
    }
}
