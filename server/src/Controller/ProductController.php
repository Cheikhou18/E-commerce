<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
// use Symfony\Component\Security\Core\Security;

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

    #[Route('/api/products', name: 'app_product_list', methods: ['GET'])]
    public function getProducts()
    {
        $products = $this->entityManager->getRepository(Product::class)->getAll();

        return $this->json([
            'success' => true,
            'produits' => $products
        ]);
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
        $product->setPopularity(0);

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



    #[Route('/api/products/{id}', name: 'app_product_details')]
    public function productdetails(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $id = $request->get('id');
        $product = $entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return $this->json(['success' => false]);
        }

        // Increase popularity of the product

        $popularity = $product->getPopularity() + 1;
        $product->setPopularity($popularity);

        $entityManager->flush();

        return $this->json([
            'success' => true,
            'product' => $product,
        ]);
    }
}
