package com.example.application.data.endpoint;

import com.example.application.data.entity.SampleFoodProduct;
import com.example.application.data.service.SampleFoodProductService;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import java.util.Optional;
import java.util.UUID;
import javax.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Endpoint
@PermitAll
public class SampleFoodProductEndpoint {

    private SampleFoodProductService service;

    public SampleFoodProductEndpoint(@Autowired SampleFoodProductService service) {
        this.service = service;
    }

    @Nonnull
    public Page<@Nonnull SampleFoodProduct> list(Pageable page) {
        return service.list(page);
    }

    public Optional<SampleFoodProduct> get(@Nonnull UUID id) {
        return service.get(id);
    }

    @Nonnull
    public SampleFoodProduct update(@Nonnull SampleFoodProduct entity) {
        return service.update(entity);
    }

    public void delete(@Nonnull UUID id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }

}
