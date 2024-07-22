<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthenticationController extends AbstractController
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    #[Route('/api/signup', name: 'signup')]
    public function signup(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), false);
        $userExists = $this->em->getRepository(User::class)->findOneByEmail($data->email);

        if ($userExists) {
            return $this->json(['success' => false, 'message' => 'User already exists']);
        }

        $plainPassword = $data->password;

        $user = new User();
        $user->setEmail($data->email);

        $hashedPassword = $passwordHasher->hashPassword($user, $plainPassword);
        $user->setPassword($hashedPassword);
        $user->setCreationDate(new DateTimeImmutable());

        $this->em->persist($user);
        $this->em->flush();

        return $this->json([
            'success' => true,
            'user' => $user
        ]);
    }

    #[Route('/api/signin', name: 'signin')]
    public function signin(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), false);
        $userExists = $this->em->getRepository(User::class)->findOneByEmail($data->email);

        if (!$userExists) {
            return $this->json(['success' => false, 'message' => 'User does not exist']);
        }

        if ($userExists->password !== $data->password) {
            return $this->json(['success' => false, 'message' => 'Incorrect password']);
        }

        return $this->json(['success' => true, 'user' => $userExists]);
    }
}
