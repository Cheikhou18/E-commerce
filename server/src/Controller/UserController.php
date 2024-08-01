<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserController extends AbstractController
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    #[Route('/api/users/{id}', name: 'user_info', methods: ['GET'])]
    public function userInfo($id): JsonResponse
    {
        $user = $this->em->getRepository(User::class)->find($id);

        if (!$user) {
            return new JsonResponse(['success' => false, 'message' => 'User not found'], 404);
        }

        $response = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'password' => $user->getPassword()
        ];

        return $this->json(['success' => true, 'response' => $response]);
    }

    #[Route('/api/users/{id}', name: 'update_user', methods: ['PATCH'])]
    public function updateUser($id, Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), false);
        $user = $this->em->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json(['success' => false, 'message' => 'User not found'], 404);
        }

        if (!$passwordHasher->isPasswordValid($user, $data->password)) {
            $hashedPassword = $passwordHasher->hashPassword($user, $data->password);
            $user->setPassword($hashedPassword);
        }

        $user->setFirstname($data->firstname);
        $user->setLastname($data->lastname);
        $user->setEmail($data->email);

        $this->em->flush();

        return $this->json(['success' => true, 'message' => 'User updated successfully'], 200);
    }
}
