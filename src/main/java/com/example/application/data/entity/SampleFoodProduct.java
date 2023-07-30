package com.example.application.data.entity;

import com.example.application.data.AbstractEntity;
import dev.hilla.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;

@Entity
public class SampleFoodProduct extends AbstractEntity {

    @Nonnull
    @Lob
    private String image;
    @Nonnull
    private String name;
    @Nonnull
    private String eanCode;

    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEanCode() {
        return eanCode;
    }
    public void setEanCode(String eanCode) {
        this.eanCode = eanCode;
    }

}
