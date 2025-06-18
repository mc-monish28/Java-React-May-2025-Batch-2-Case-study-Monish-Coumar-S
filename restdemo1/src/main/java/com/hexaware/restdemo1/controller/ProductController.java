package com.hexaware.restdemo1.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.hexaware.restdemo1.entity.Product;
import com.hexaware.restdemo1.entity.ProductRepository;

@RestController
public class ProductController 
{
	@Autowired
	ProductRepository productRepository;
	
	@PostMapping("/api/products/")
	ResponseEntity<Product> insert(@RequestBody Product product)
	{
		Product p=productRepository.save(product);
		return new ResponseEntity<Product>(p,HttpStatus.OK);
	}
	
	@PutMapping("/api/products/{id}")
	ResponseEntity<Product> update(@RequestBody Product product,@PathVariable Integer id)
	{
		
		Optional<Product> optional=productRepository.findById(id);
		if(optional.isPresent())
		{
			Product pr=optional.get();
			pr.setPrice(product.getPrice());
			pr.setPname(product.getPname());
			Product updatedProduct = productRepository.save(pr);
			return new ResponseEntity<Product>(updatedProduct,HttpStatus.OK);
		}else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@GetMapping("/api/products/")
	ResponseEntity<List<Product>> getAll()
	{
		return new ResponseEntity<List<Product>>(productRepository.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/api/products/{id}")
	ResponseEntity<Product> findById(@PathVariable Integer id)
	{
		Optional<Product> optional=productRepository.findById(id);
		if(optional.isPresent())
		{
			return new ResponseEntity<Product>(optional.get(),HttpStatus.OK);
		}else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/api/products/{id}")
	ResponseEntity<Product> deleteById(@PathVariable Integer id)
	{
		Optional<Product> optional=productRepository.findById(id);
		if(optional.isPresent())
		{
			productRepository.deleteById(id);
			return new ResponseEntity<Product>(optional.get(),HttpStatus.OK);
		}else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
