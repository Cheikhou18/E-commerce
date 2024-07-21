<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthenticationController extends AbstractController
{
    private EntityManagerInterface $em;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher)
    {
        $this->em = $em;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/api/signup', name: 'signup')]
    public function signup(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), false);
        $userExists = $this->em->getRepository(User::class)->findOneByMail($data->mail);

        if ($userExists) {
            return $this->json(['success' => false, 'message' => 'User already exists']);
        }

        $plainPassword = $data->password;

        $user = new User();
        $user->setFirstname($data->firstname);
        $user->setLastname($data->lastname);
        $user->setMail($data->email);

        $hashedPassword = $passwordHasher->hashPassword($user, $plainPassword);
        $user->setPassword($hashedPassword);

        return $this->json([
            'success' => true,
        ]);
    }

    #[Route('/api/signin', name: 'signin')]
    public function signin(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), false);
        $userExists = $this->em->getRepository(User::class)->findOneByMail($data->email);

        if (!$userExists) {
            return $this->json(['success' => false, 'message' => 'User does not exist']);
        }

        if ($userExists->password !== $data->password) {
            return $this->json(['success' => false, 'message' => 'Incorrect password']);
        }

        return $this->json(['success' => true, 'user' => $userExists]);
    }
}
