// necessary class for Quote to demonstrate json data

package sequoiaGrove;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
    public class Value {

            private Long id;
            private String quote;

    }
