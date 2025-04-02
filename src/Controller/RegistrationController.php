<?php

namespace App\Controller;

use App\Entity\Users;
use App\Form\RegistrationFormType;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use ReflectionClass;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager,UsersRepository $userRepo): Response
    {
        $user = new Users();
        
        if ($request->isMethod('POST')) {
            if ($request->request->get('inputFirstName')){
                $user->setFirstName($request->request->get('inputFirstName'));
            }else{
                return $this->redirectToRoute('app_register');
            }
            if($request->request->get('inputLastName')){
                $user->setLastName($request->request->get('inputLastName'));
            }
            if($request->request->get('inputUsername')){
                $user->setUsername($request->request->get('inputUsername'));
            }
            if($request->request->get('inputEmail')){
                $user->setEmail($request->request->get('inputEmail'));
            }
            if($request->request->get('inputEmail')){
                $user->setEmail($request->request->get('inputEmail'));
            }
            
            if($request->request->get('inputPassword')){
                $user->setPassword($userPasswordHasher->hashPassword($user, $request->request->get('inputPassword')));
            }

            if ( $userRepo->findOneBy(['email' => $user->getEmail()]) ) {
                $this->addFlash('error', 'Email already exists');
                
                return $this->redirectToRoute('app_register');
            }else{
                $entityManager->persist($user);
                $entityManager->flush();
                return $this->redirectToRoute('app_login');
            }
            

            
        }
        return $this->render('registration/register.html.twig');
    }
}
