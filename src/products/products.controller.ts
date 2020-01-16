import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {ProductsService} from './products.service';
import {Product} from './product.model';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    /**
     * Add a new product
     *
     * @param prodTitle
     * @param prodDesc
     * @param prodPrice
     */
    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ): any {
        const generatedId = this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
        );

        return { id: generatedId };
    }

    @Get()
    getAllProducts() {
        return this.productsService.fetchProducts();
    }

    /**
     * Get a product by id
     * @param prodId
     * @returns {id: string, title: string, description: string, price: number}
     */
    @Get(':id')
    getProduct(@Param('id') prodId: string): Product {
        return this.productsService.fetchSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number,
    ) {
        this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);

        return null;
    }
}
