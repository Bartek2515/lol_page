<?php

namespace App\Controller;

use App\Repository\CounterGuideRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\NotesService;
use Symfony\Component\HttpFoundation\Request;

final class NotesController extends AbstractController
{
    public function __construct(private NotesService $notesService, private CounterGuideRepository $counterGuideRepo)
    {
        
    }
    
    #[Route('/', name: 'app_counter_guide')]
    public function index(): Response
    {
        $user = $this->getUser();
         
        if (!$user) {
            return $this->redirectToRoute('app_login');
        }

        return $this->render('notes/notes.html.twig',[
            'counterGuides' => $this->notesService->getCounterGuide($user),
        ]);
    }

    #[Route('/edit/{id}', name: 'app_edit_counter_guide')]
    public function edit($id, Request $request): Response
    {
        $user = $this->getUser();
        $counterGuides = $this->notesService->getCounterGuideById($user, $id);
        
        if (!$user) {
            return $this->redirectToRoute('app_login');
        }
        
        if ($request->isMethod('POST')) {
            dd($request->request->get('role'));
        }
        
        return $this->render('notes/edit.html.twig',[
            'counterGuides' => $counterGuides,
        ]);
    }
    #[Route('/delete/{id}', name: 'app_delete_counter_guide')]
    public function delete($id, Request $request): Response
    {
        $user = $this->getUser();
        
        if (!$user) {
            return $this->redirectToRoute('app_login');
        }
        
        $this->notesService->deleteCounterGuide($id);
        
        return $this->redirectToRoute('app_counter_guide');
    }
    
    #[Route('/add', name: 'app_add_counter_guide')]
    public function add(Request $request): Response
    {
        $user = $this->getUser();
        
        
        if (!$user) {
            return $this->redirectToRoute('app_login');
        }
        
        if ($request->isMethod('POST')) {
            $this->notesService->addCounterGuide($request->request->all(), $user);
            return $this->redirectToRoute('app_counter_guide');
        }
        
        
        return $this->render('notes/add.html.twig',[
            // 'champions' => ,
            'rune1' => $this->notesService->getRunesByTier(1),
            'rune2' => $this->notesService->getRunesByTier(2),
            'rune3' => $this->notesService->getRunesByTier(3),
            'rune4' => $this->notesService->getRunesByTier(4),
        ]);
    }
}
