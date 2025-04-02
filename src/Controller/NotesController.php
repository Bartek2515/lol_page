<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\NotesService;

final class NotesController extends AbstractController
{
    public function __construct(private NotesService $notesService)
    {
        
    }
    
    #[Route('/', name: 'app_notes')]
    public function index(): Response
    {
        $user = $this->getUser();
         
        if (!$user) {
            return $this->redirectToRoute('app_login');
        }else{
            $counterGuides = $this->notesService->getCounterGuide($user);
            
            
        }

        return $this->render('notes/notes.html.twig',[
            'counterGuides' => $counterGuides,
        ]);
    }
}
