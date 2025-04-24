<?php

namespace App\Controller;

use App\Repository\ChampionRepository;
use App\Repository\RuneRepository;
use App\Service\NotesService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\CounterGuide;

final class ApiController extends AbstractController
{
    public function __construct(private NotesService $notesService,private ChampionRepository $championRepo, private RuneRepository $runeRepo)
    {
        
    }

    #[Route('/api/champions/{laneName}', name: 'app_api_champions',methods:['GET'])]
    public function getChampions(string $laneName): JsonResponse
    {
        $champions = $this->championRepo->findBy(['role' => $laneName]);
        
        // Przekształć tablicę obiektów Champion na tablicę nazw
        $names = array_map(fn($champion) => $champion->getName(), $champions);

        return $this->json($names);
    }
    
    #[Route('/api/runes/{tree}', name: 'app_api_runes',methods:['GET'])]
    public function getRunes(string $tree, RuneRepository $runeRepo): JsonResponse
    {
        $runes = $this->runeRepo->findBy(['tree' => $tree]);
        
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
    #[Route('/api/add', name: 'app_api_add', methods: ['POST'])]
    public function addPost(Request $request): Response
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['status' => 'error', 'message' => 'User not authenticated'], 401);
        }

        $data = $request->request->all();
        
        if (empty($data['role'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Role is required'], 400);
        }

        try {
            $this->notesService->addCounterGuide($data, $user);
            return new JsonResponse(['status' => 'success', 'data' => $data,'redirect_url' => $this->generateUrl('app_counter_guide')]);
        } catch (\Exception $e) {
            // $logger->error('Error adding counter guide: ' . $e->getMessage());
            return new JsonResponse(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
