<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class ProductController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private Security $security;

    public function __construct(EntityManagerInterface $entityManager, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    private function isAdmin(): bool
    {
        return $this->security->isGranted('ROLE_ADMIN');
    }

    #[Route('/api/products', name: 'add_product', methods: ['POST'])]
    public function addProduct(Request $request): JsonResponse
    {
        if (!$this->isAdmin()) {
            return new JsonResponse(['status' => 'Access denied'], 403);
        }

        $data = json_decode($request->getContent(), true);

        $product = new Product();
        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Product created!'], 201);
    }

    #[Route('/api/products/{id}', name: 'edit_product', methods: ['PUT'])]
    public function editProduct($id, Request $request): JsonResponse
    {
        if (!$this->isAdmin()) {
            return new JsonResponse(['status' => 'Access denied'], 403);
        }

        $product = $this->entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return new JsonResponse(['status' => 'Product not found!'], 404);
        }

        $data = json_decode($request->getContent(), true);
        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);

        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Product updated!'], 200);
    }

    #[Route('/api/products/{id}', name: 'delete_product', methods: ['DELETE'])]
    public function deleteProduct($id): JsonResponse
    {
        if (!$this->isAdmin()) {
            return new JsonResponse(['status' => 'Access denied'], 403);
        }

        $product = $this->entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return new JsonResponse(['status' => 'Product not found!'], 404);
        }

        $this->entityManager->remove($product);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Product deleted!'], 200);
    }
}
