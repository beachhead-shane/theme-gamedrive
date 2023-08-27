Shader "Custom/SimpleSpriteOutline"
{
    Properties
    {
        _MainTex ("Sprite Texture", 2D) = "white" {}
        _OutlineColor ("Outline Color", Color) = (1, 1, 1, 1)
        _OutlineThickness ("Outline Thickness", Range(0, 0.1)) = 0.02
        _Enabled ("Enabled", Range(0,1)) = 1
    }

    SubShader
    {
        Tags { "Queue" = "Transparent" "RenderType" = "Transparent" }
        LOD 100

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;
            float _OutlineThickness;
            float4 _OutlineColor;
            float _Enabled;

            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                return o;
            }

            half4 frag (v2f i) : SV_Target
            {
                half4 col = tex2D(_MainTex, i.uv);

                if (_Enabled > 0.5)
                {
                    // Check pixels around the current one to determine the outline
                    half4 left = tex2D(_MainTex, i.uv + float2(-_OutlineThickness, 0));
                    half4 right = tex2D(_MainTex, i.uv + float2(_OutlineThickness, 0));
                    half4 up = tex2D(_MainTex, i.uv + float2(0, _OutlineThickness));
                    half4 down = tex2D(_MainTex, i.uv + float2(0, -_OutlineThickness));

                    if (col.a == 0 && (left.a > 0 || right.a > 0 || up.a > 0 || down.a > 0))
                    {
                        return _OutlineColor;
                    }
                }
                
                return col;
            }
            ENDCG
        }
    }
}
