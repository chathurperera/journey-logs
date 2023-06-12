module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@jl/assets': 'src/assets/index',
          '@jl/components': 'src/components/index',
          '@jl/config': 'src/config/index',
          '@jl/constants': 'src/constants/index',
          '@jl/hooks': 'src/hooks/index',
          '@jl/models': 'src/models/index',
          '@jl/navigation': 'src/navigation/index',
          '@jl/screens': 'src/screens/index',
          '@jl/services': 'src/services/index',
          '@jl/stores': 'src/stores/index',
          '@jl/utils': 'src/utils/index',
        },
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
  ],
};
